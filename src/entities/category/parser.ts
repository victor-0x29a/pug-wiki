import { ICategory } from "../dto/category.dto";

export const parseCategory = ({ label, slug }: ICategory) => ({ label, slug })