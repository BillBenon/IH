import {
    AdvancedFormControlProps,
    AdvancedFormLocalization,
} from "components/AdvancedComponents/AdvancedForm";
import { SubProductType, ProductType } from "utils/constants";
import { isNumeric } from "utils/commonutils";
import * as Yup from "yup";

export const productSchema = Yup.object().shape({
    id: Yup.string().optional(),
    active: Yup.string().optional(),
    name: Yup.string(),
    market: Yup.string().required("Market is required"),
    serviceType: Yup.string().when(["id", "subProductType"], {
        is: (id, subProductType) =>
            !isNumeric(id) && subProductType == SubProductType.EXPERTMEETING,
        then: Yup.string().required("Service Type is required"),
        otherwise: Yup.string().notRequired(),
    }),
    serviceEntities: Yup.string().optional(),
    description: Yup.string().required("Description is required"),
    displayDescription: Yup.string().required("Display Description is required"),
    nextStep: Yup.string().optional().default(""),
    followUp: Yup.string().optional().default(""),
    productType: Yup.string()
        .when(["id"], {
            is: (id) => !id,
            then: Yup.string().required("Product-Type Is Required"),
            otherwise: Yup.string().notRequired(),
        })
        .default(""),

    subProductType: Yup.string().when(["id"], {
        is: (id) => !id,
        then: Yup.string().required("Sub-Type Is Required"),
        otherwise: Yup.string().notRequired(),
    }),

    price: Yup.number().optional(),
    productExpertId: Yup.string().when(["productType"], {
        is: (val) => {
            return val === ProductType.EXPERT;
        },
        then: Yup.string().required("Product Expert Is Required"),
        otherwise: Yup.string().notRequired(),
    }),

    recurringPriceType: Yup.string().when(["subProductType", "id"], {
        is: (subProductType, id) => {
            return subProductType === "trackPlanSubscription" && !id;
        },
        then: Yup.string().required("Subscription Type Is Required"),
        otherwise: Yup.string().notRequired(),
    }),

    recurringFrequency: Yup.number()
        .transform((value) => (isNaN(value) ? 0 : value))
        .when(["subProductType", "id"], {
            is: (subProductType, id) => {
                return subProductType === "trackPlanSubscription" && !id;
            },
            then: Yup.number()
                .required("Subscription Duration Is Required")
                .moreThan(0, "Subscription Duration Should Be Greater than 0")
                .lessThan(13, "Subscription Duration Should Be  Less Than 13"),
            otherwise: Yup.number().notRequired(),
        }),

    tracks: Yup.string().when("productType", {
        is: (val) => val === "trackPlan",
        then: Yup.string().required("Track Is Required"),
        otherwise: Yup.string().notRequired(),
    })
});

export const scheduleSchema = Yup.object().shape({
    dateAndTime: Yup.string(),
    topic: Yup.string(),
    description: Yup.string().optional(),
    duration: Yup.string().optional(),
    recordingURL: Yup.string().optional(),
    recordingPassword: Yup.string().optional(),
    zoomDetails: Yup.string().optional(),
});

export const classSchema = Yup.object().shape({
    startDate: Yup.string(),
    endDate: Yup.string(),
    zoomDetails: Yup.string().optional(),
    schedule: Yup.array().of(scheduleSchema),
});

export const schedulePlaceholder = (prefix: string) => {
    return {
        [prefix + "." + "topic"]: "Topic",
        [prefix + "." + "dateAndTime"]: "Date and Time",
        [prefix + "." + "expertId"]: "Experts",
        [prefix + "." + "description"]: "Description",
        [prefix + "." + "duration"]: "Duration",
        [prefix + "." + "recordingURL"]: "Recording URL",
        [prefix + "." + "recordingPassword"]: "Recording Password",
        [prefix + "." + "zoomDetails"]: "Zoom Details",
    } as AdvancedFormLocalization;
};

export const classInfoPlaceholder = {
    startDate: "Start Date",
    endDate: "End Date",
    zoomDetails: "Zoom Details",
    expertId: "Expert",
};

export const classInfoLocalization = {
    startDate: "Start Date",
    endDate: "End Date",
    zoomDetails: "Zoom Details",
    expertId: "Expert",
};

export const classInfoType: AdvancedFormControlProps = {
    startDate: "date",
    endDate: "date",
    zoomDetails: "input",
    expertId: "select",
};

export const classInfoSize = {
    startDate: 6,
    endDate: 6,
};

export const scheduleFieldSize = (prefix: string) => {
    return {
        [prefix + "." + "topic"]: 6,
        [prefix + "." + "dateAndTime"]: 6,
        [prefix + "." + "duration"]: 6,
        [prefix + "." + "recordingPassword"]: 6,
    };
};

export const placeholder: AdvancedFormLocalization = {
    price: "Price",
    description: "Description",
    name: "Product Name",
    productExpertId: "Expert",
    market: "Market",
    serviceType: "Type of Service",
    serviceEntities: "Service Entities",
    active: "Status",
    displayName: "Display Name",
    displayDescription: "Display Description",
    followUp: "Follow Up",
    nextStep: "Next Step",
    tracks: "Tracks",
    productType: "Product Type",
    subProductType: "Sub Product Type",
    recurringPriceType: "Subscription Type",
    recurringFrequency: "Subscription Duration"
}

export const scheduleLocalization = (prefix: string) => {
    return {
        [prefix + "." + "topic"]: "Topic",
        [prefix + "." + "dateAndTime"]: "Date and Time",
        [prefix + "." + "expertId"]: "Experts",
        [prefix + "." + "description"]: "Description",
        [prefix + "." + "duration"]: "Duration",
        [prefix + "." + "recordingURL"]: "Recording URL",
        [prefix + "." + "recordingPassword"]: "Recording Password",
        [prefix + "." + "zoomDetails"]: "Zoom Details",
    } as AdvancedFormLocalization;
};

export const scheduleDefaultValues = (prefix: string, defaultValue: any) => {
    return {
        [prefix + "." + "topic"]: defaultValue.topic,
        [prefix + "." + "dateAndTime"]: defaultValue.dateAndTime,
        [prefix + "." + "expertId"]: defaultValue.expertId,
        [prefix + "." + "description"]: defaultValue.description || "",
        [prefix + "." + "duration"]: defaultValue.duration,
        [prefix + "." + "recordingURL"]: defaultValue.recordingURL,
        [prefix + "." + "recordingPassword"]: defaultValue.recordingPassword,
        [prefix + "." + "zoomDetails"]: defaultValue.zoomDetails,
    } as AdvancedFormLocalization;
};

export const localization: AdvancedFormLocalization = {
    price: "Product Price(Cents)",
    name: "Name",
    productExpertId: "Expert",
    market: "Market",
    serviceType: "Type of Service",
    serviceEntities: "Service Entities",
    active: "Status",
    displayName: "Display Name",
    description: "Description",
    displayDescription: "Display Description",
    followUp: "Follow Up",
    nextStep: "Next Step",
    tracks: "Tracks",
    productType: "Product Type",
    subProductType: "Sub Product Type",
    recurringPriceType: "Subscription Type",
    recurringFrequency: "Subscription Duration"
}

export const scheduleType = (prefix: string) => {
    return {
        [prefix + "." + "topic"]: "input",
        [prefix + "." + "dateAndTime"]: "datetime",
        [prefix + "." + "expertId"]: "select",
        [prefix + "." + "description"]: "textarea",
        [prefix + "." + "recordingURL"]: "input",
        [prefix + "." + "recordingPassword"]: "password",
        [prefix + "." + "duration"]: "input",
        [prefix + "." + "zoomDetails"]: "input",
    } as AdvancedFormControlProps;
};

export const type: AdvancedFormControlProps = {
    productType: "select",
    subProductType: "select",
    active: "radio",
    tracks: "multiselect",
    productExpertId: "select",
    market: "select",
    serviceType: "select",
    serviceEntities: "multiselect",
    name: "input",
    displayName: "input",
    description: "textarea",
    displayDescription: "textarea",
    price: "input",
    recurringPriceType: "select",
    recurringFrequency: "number",
    followUp: "textarea",
    nextStep: "textarea",
};

export const fieldSize = {
    productType: 4,
    subProductType: 4,
    active: 4,
    tracks: 4,
    productExpertId: 4,
    market: 4,
    serviceType: 4,
    serviceEntities: 4,
    recurringPriceType: 6,
    recurringFrequency: 6,
    startDate: 6,
    endDate: 6
}
