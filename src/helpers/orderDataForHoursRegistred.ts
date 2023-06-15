import { ElementArgs } from "@/interfaces";

export const orderDate = (arr: ElementArgs[]) => {

    const newArr = [...arr];

    return newArr.sort((a,b) => b.times_created! - a.times_created!)

}