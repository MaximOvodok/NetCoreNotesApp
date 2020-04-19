import React, { SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, DropdownButton, DropdownField } from "./controls";
import "./NoteForm.scss";
import { NoteService, TagService } from "../services";
import { INote, ITag } from "../entities";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import { severityClasses, severityDefaultValue } from "../common/Consts";
import AsyncCreatableSelect from "react-select/async-creatable";

import {
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  ModalFooter,
} from "reactstrap";

import { INoteFormProps } from "../types/ComponentsPropsTypes";
import { IFormData } from "../types/ComponentsStateTypes";
import ComponentsHelper from "../helpers/ComponentsHelper";
import { withRouter } from "react-router";
import { ActionMeta } from "react-select";

const NoteForm = (props: INoteFormProps) => {
  const [severities, setSeverities] = useState<
    Array<{ key: number; value: string; isActive: boolean }>
  >([]);
  const [formData, setFormData] = useState<IFormData>({
    id: 0,
    text: "",
    severity: severityDefaultValue,
    tags: [],
  });

  const [isModalOpen, toggleModal] = useState(
    props.location?.state ? props.location.state["isOpen"] : false
  );

  const isEditMode = props.location?.state && props.location?.state["note"];

  useEffect(() => {
    let controller = new AbortController();

    const fetchSeverities = async () => {
      var severities = await NoteService.getSeverities(controller);

      setSeverities(
        ComponentsHelper.ConvertSeveritiesToState(
          severities,
          formData.severity.key
        )
      );
    };

    fetchSeverities().then(() => {
      if (isEditMode) {
        let inputNote = props.location?.state["note"] as INote;

        setFormData({
          ...formData,
          id: inputNote.id,
          text: inputNote.text,
          severity: {
            ...formData.severity,
            key: inputNote.severity
              ? inputNote.severity.id.toString()
              : severityDefaultValue.key,
            value: inputNote.severity
              ? inputNote.severity.text
              : severityDefaultValue.value,
          },
          tags: inputNote.tags.map((tag: ITag) => ({
            value: tag.id,
            label: tag.name,
          })),
        });
      }
    });

    return () => {
      controller.abort();
    };
  }, []);

  useEffect((): void => {
    setSeverities(
      ComponentsHelper.ChangeActiveSeverity(severities, formData.severity.key)
    );
  }, [formData.severity.key]);

  function promiseOptions(inputValue: string): Promise<any> {
    return new Promise<any>((resolve) => {
      if (!inputValue) {
        resolve([]);
      } else {
        TagService.searchTags(inputValue).then((tags: any) => {
          resolve(
            tags.map((t: any) => ({
              value: t.id,
              label: t.name,
            }))
          );
        });
      }
    });
  }

  function onTagSelect(
    newValue: Array<{ label: string; value: number; __isNew__: boolean }>,
    actionMeta: ActionMeta
  ): void {
    setFormData({
      ...formData,
      tags: ComponentsHelper.convertTagsFromState(newValue),
    });
  }

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    let note: INote = ComponentsHelper.ConvertFormStateToNote(formData);

    NoteService.createNote(note)
      .then(() => {
        window.history.back();
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  function onSeverityChange(event: any, key: string) {
    event.preventDefault();

    setFormData({
      ...formData,
      [key]: {
        key: event.target.id,
        value: event.target.textContent,
      },
    });
  }

  function onChange(event: any, key: string) {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  }

  function onFormClosed(): void {
    window.history.back();
  }

  const formTitle = (isEditMode ? "Edit" : "Create").concat(" ", "note");

  return (
    <div className="form-container">
      <Form onSubmit={(e) => onSubmit(e)}>
        <Modal
          isOpen={isModalOpen}
          onClosed={onFormClosed}
          contentClassName={severityClasses[formData.severity.value]}
        >
          <ModalHeader toggle={() => toggleModal(!isModalOpen)}>
            {formTitle}
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <TextField
                isMulti
                key={"text"}
                placeholder="Text"
                onChange={(e) => onChange(e, "text")}
                value={formData.text}
              />
              <DropdownButton
                items={severities}
                onSelect={(e) => onSeverityChange(e, "severity")}
              >
                <span className="oi oi-warning">Severity</span>
              </DropdownButton>
              <DropdownField
                isAsync
                onChangeAsync={(newValue: any, actionMeta: any) =>
                  onTagSelect(newValue, actionMeta)
                }
                loadOptions={promiseOptions}
                value={formData.tags}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <div className="submit-button">
              <Button type="submit" />
            </div>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};

export default withRouter(NoteForm);
