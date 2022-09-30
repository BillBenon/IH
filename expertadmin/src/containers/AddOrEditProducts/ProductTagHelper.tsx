import * as Yup from "yup";
import { AdvancedFormControlProps } from "../../components/AdvancedComponents/AdvancedForm";

export const tagSchema = Yup.object().shape({
    key: Yup.string().optional(),
    value: Yup.string().when("tagKey", {
        is: (val) => val.length > 0,
        then: Yup.string().required("Pick at least 1 tag"),
        otherwise: Yup.string().required('Tag is required')
    })
})
export const tagInfoPlaceholder = {
    key: "Tag Key",
    value: "Tag"
}

export const tagInfoLocalization = {
    key: "Tag Key",
    value: "Tag"
}

export const tagInfoType: AdvancedFormControlProps = {
    key: "select",
    value: "multiselect"
}

export const tagInfoSize = {
    key: 12,
    value: 12
}
