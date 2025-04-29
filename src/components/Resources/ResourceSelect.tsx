import { nemosStore } from "../../common/stores/nemosStore";

interface ResourceSelectInterface {
  amountSelectable: number;
  option: string;
}
export function ResourceSelect({
  option,
  amountSelectable,
}: ResourceSelectInterface) {
  const resolvingSelected = nemosStore((state) => state.resolvingSelected);
  const setResolvingSelected = nemosStore(
    (state) => state.setResolvingSelected
  );
  const nemoSelected = resolvingSelected.includes("nemo");
  const crewSelected = resolvingSelected.includes("crew");
  const hullSelected = resolvingSelected.includes("hull");
  const setNemoSelected = () =>
    !nemoSelected
      ? setResolvingSelected(resolvingSelected.concat("nemo"))
      : setResolvingSelected(
          resolvingSelected.filter((selected) => {
            return selected != "nemo";
          })
        );
  const setCrewSelected = () =>
    !crewSelected
      ? setResolvingSelected(resolvingSelected.concat("crew"))
      : setResolvingSelected(
          resolvingSelected.filter((selected) => {
            return selected != "crew";
          })
        );
  const setHullSelected = () =>
    !hullSelected
      ? setResolvingSelected(resolvingSelected.concat("hull"))
      : setResolvingSelected(
          resolvingSelected.filter((selected) => {
            return selected != "hull";
          })
        );

  const amountSelected = [nemoSelected, crewSelected, hullSelected].filter(
    Boolean
  ).length;

  const selectionLimitMet = amountSelectable
    ? amountSelected >= amountSelectable
    : false;

  let setSelected = () => {
    option == "nemo"
      ? setNemoSelected()
      : option == "crew"
      ? setCrewSelected()
      : setHullSelected();
  };

  const thisResourceIsSelected = (resourceName: string) => {
    switch (resourceName) {
      case "nemo":
        return nemoSelected;
      case "crew":
        return crewSelected;
      case "hull":
        return hullSelected;
      default:
        false;
    }
  };

  const handleClick = () => {
    !selectionLimitMet
      ? setSelected()
      : thisResourceIsSelected(option)
      ? setSelected()
      : {};
  };

  return (
    <>
      <div className={`resource-wrapper`}>
        <div className="resource-info">
          <div
            className={`resource-info-name ${
              selectionLimitMet
                ? thisResourceIsSelected(option)
                  ? ``
                  : `shrink disabled`
                : thisResourceIsSelected(option)
                ? ``
                : `shrink`
            }`}
            data-resource={option}
            onClick={handleClick}
          >
            <p>{option.toUpperCase()}</p>
          </div>
        </div>
      </div>
    </>
  );
}
