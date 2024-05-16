import { ListContainer } from "./ListConteiner";
import { NoDataCard } from ".";

export default {
    component: ListContainer,
    title: "List container",
    tags: ["autodocs"]
}

export const Default = {
    args: {
        children: <>
            <li>a</li>
            <li>b</li>
            <li>c</li>
        </>
    }
};

export const NoData = {
    args: {
        children: <>
            <NoDataCard />
        </>
    }
};