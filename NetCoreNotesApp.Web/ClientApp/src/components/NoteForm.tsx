import React, { SyntheticEvent, useState, useEffect } from "react";
import { Button } from "./controls";
import "./NoteForm.scss";
import { NoteService, TagService } from "../services";
import { ITag, INote } from "../entities";
import "open-iconic/font/css/open-iconic-bootstrap.css";
import { severityClasses, severityDefaultValue } from "../common/Consts";

import { Modal, ModalHeader, ModalBody, Form, ModalFooter } from "reactstrap";

import { INoteFormProps } from "../types/ComponentsPropsTypes";
import { IFormData } from "../types/ComponentsStateTypes";
import ComponentsHelper from "../helpers/ComponentsHelper";
import { withRouter } from "react-router";
import FormBuilder from "./FormBuilder";
import TextBoxBuilder from "./TextBoxBuilder";
import DropdownButtonBuilder from "./DropdownButtonBuilder";
import DropdownBuilder from "./DropdownBuilder";
import ValidationRules from "./ValidationRules";

const NoteForm = (props: INoteFormProps) => {
  const [severities, setSeverities] = useState<
    Array<{ key: number; value: string; isActive: boolean }>
  >([]);
  const [formData, setFormData] = useState<IFormData>(props.values);
  const [validationData, setValidationData] = useState<{
    [key: string]: string;
  }>({});

  useEffect(() => {
    setFormData(props.values);
    setValidationData(props.errors);
  }, [props]);

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

        props.setNoteValue(null, {
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
          tags: ComponentsHelper.ConvertTagsToState(inputNote.tags),
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

  const formComponent = new FormBuilder()
    .addField(
      new TextBoxBuilder({
        isMulti: true,
        key: "text",
        placeholder: "Text",
        onChange: props.setNoteValue,
        isRequired: true,
        value: formData.text,
        errorText: validationData["text"],
        validationRules: [ValidationRules.required],
      })
    )
    .addField(
      new DropdownButtonBuilder({
        key: "severity",
        items: severities,
        onSeverityChange: props.setNoteValue,
      })
    )
    .addField(
      new DropdownBuilder({
        key: "tags",
        isAsync: true,
        onChange: props.setNoteValue,
        loadOptions: promiseOptions,
        value: formData.tags,
      })
    );

  function promiseOptions(inputValue: string): Promise<any> {
    return new Promise<any>((resolve) => {
      if (!inputValue) {
        resolve([]);
      } else {
        TagService.searchTags(inputValue).then((tags: Array<ITag>) => {
          resolve(ComponentsHelper.ConvertTagsToState(tags));
        });
      }
    });
  }

  function onSubmit(event: SyntheticEvent) {
    event.preventDefault();

    let errors = formComponent.validateControls();

    props.validateAction(errors);

    let note: INote = ComponentsHelper.ConvertFormStateToNote(formData);

    NoteService.createNote(note)
      .then(() => {
        window.history.back();
      })
      .catch((error: any) => {
        console.error(error);
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
          <ModalBody>{formComponent.buildForm()}</ModalBody>
          <ModalFooter>
            <div className="submit-button">
              <Button type="submit" onClick={(e) => onSubmit(e)} />
            </div>
          </ModalFooter>
        </Modal>
      </Form>
    </div>
  );
};

export default withRouter(NoteForm);
