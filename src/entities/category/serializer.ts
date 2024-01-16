import { ICategory } from "../dto/category.dto";

export const serializeCategory = ({ label, slug }: ICategory) => ({ label, slug })