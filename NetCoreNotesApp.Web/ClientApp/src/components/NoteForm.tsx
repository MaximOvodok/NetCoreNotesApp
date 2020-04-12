import React, { SyntheticEvent, useState, useEffect } from "react";
import { Button, TextField, DropdownButton } from "./controls";
import "./NoteForm.scss";
import { NoteService, TagService } from "../services";
import { INote, ITag } from "../entities";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import { severityClasses } from "../common/Consts";
import AsyncCreatableSelect from "react-select/async-creatable";

import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import { INoteFormProps } from "../types/ComponentsPropsTypes";
import { IFormData } from "../types/ComponentsStateTypes";
import ComponentsHelper from "../helpers/ComponentsHelper";
import { withRouter } from "react-router";

const NoteForm = (props: INoteFormProps) => {
  const [severities, setSeverities] = useState<
    Array<{ key: number; value: string; isActive: boolean }>
  >([]);
  const [formData, setFormData] = useState<IFormData>({
    id: 0,
    text: "",
    severity: { key: "2", value: "Normal" },
    tags: [],
  });

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
      if (props.location?.state && props.location?.state["note"]) {
        let inputNote = props.location?.state["note"] as INote;

        setFormData({
          ...formData,
          id: inputNote.id,
          text: inputNote.text,
          severity: {
            ...formData.severity,
            key: inputNote.severity ? inputNote.severity.id.toString() : "2",
            value: inputNote.severity ? inputNote.severity.text : "Normal",
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
    actionMeta: any
  ) {
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
        window.location.href = "/";
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

  let isOpen = props.location?.state ? props.location.state["isOpen"] : false;

  return (
    <Modal isOpen={isOpen || false}>
      <ModalHeader>Modal title</ModalHeader>
      <ModalBody>
        <div className="form-container">
          <form
            onSubmit={(e) => onSubmit(e)}
            className={severityClasses[formData.severity.value]}
          >
            <fieldset>
              <TextField
                isMulti
                key={"text"}
                placeholder="Text"
                onChange={(e) => onChange(e, "text")}
                value={formData.text}
              />
              <div className="form-field">
                <DropdownButton
                  items={severities}
                  onSelect={(e) => onSeverityChange(e, "severity")}
                >
                  <span className="oi oi-warning">Severity</span>
                </DropdownButton>
              </div>
              <div className="form-field">
                <AsyncCreatableSelect
                  isMulti
                  cacheOptions
                  defaultOptions
                  onChange={(newValue: any, actionMeta: any) =>
                    onTagSelect(newValue, actionMeta)
                  }
                  loadOptions={promiseOptions}
                  value={formData.tags}
                />
              </div>
            </fieldset>
            <div className="form-field">
              <Button type="submit" />
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default withRouter(NoteForm);
