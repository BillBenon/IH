import * as Yup from "yup";
import {AdvancedFormControlProps} from "../../components/AdvancedComponents/AdvancedForm";

export const videoSchema = Yup.object().shape({
    title: Yup.string().required("Title is Required"),
    description: Yup.string().optional(),
    url: Yup.string().required("URL is Required"),
    type: Yup.string().required("Type is Required")
});

export const videoInfoPlaceholder = {
    title: "Title",
    description: "Description",
    url: "Video URL",
    type: "Type"
}

export const videoInfoLocalization = {
    title: "Title",
    description: "Description",
    url: "Video URL",
    type: "Type"
}

export const videoInfoType: AdvancedFormControlProps = {
    title: "input",
    description: "input",
    url: "input",
    type: "select"
}

export const videoInfoSize = {
    title: 6,
    description: 6,
    url: 6,
    type: 6
}
