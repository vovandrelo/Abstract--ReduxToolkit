import { useDispatch, useSelector } from "react-redux";
import Tab from "../../components/Tab/Tab";
import { selectSectionNameById } from "../../store/modules/collections/sections/selectors";
import { sectionsActions } from "../../store/modules/collections/sections";

const TabContainer = ({ id }) => {
    console.log("RENDER = CONTAINER = TAB");
    const sectionName = useSelector(state => selectSectionNameById(state, id))

    const dispatch = useDispatch();

    const onChange = () => dispatch(sectionsActions.changeActiveSection({ sectionId: id }))

    return (
        <Tab name={sectionName} onChange={onChange}/>
    )
}

export default TabContainer;