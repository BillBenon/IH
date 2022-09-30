import { EvalInfo } from "./EvalInfo";

export type Capabilities = {
    _id: string,
    capabilityText: string,
    description: string,
    category: string,
    subcategory: string,
    trackType: string,
    order: number,
    weight: number,
    evaluations: EvalInfo[]
}