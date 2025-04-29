import { diceStore } from "../../common/stores/diceStore";
import { nemosStore } from "../../common/stores/nemosStore";

interface ResourceExertInterface {
  amountExertable: number;
  option: string;
}
export function ResourceExert({
  option,
  amountExertable,
}: ResourceExertInterface) {
  const doneRolling = diceStore((state) => state.doneRolling);
  const nemo = nemosStore((state) => state.nemo);
  const crew = nemosStore((state) => state.crew);
  const hull = nemosStore((state) => state.hull);
  const exertingNemo = diceStore((state) => state.exertingNemo);
  const exertingCrew = diceStore((state) => state.exertingCrew);
  const exertingHull = diceStore((state) => state.exertingHull);
  const setExertingNemo = diceStore((state) => state.setExertingNemo);
  const setExertingCrew = diceStore((state) => state.setExertingCrew);
  const setExertingHull = diceStore((state) => state.setExertingHull);

  const amountExerted = [exertingNemo, exertingCrew, exertingHull].filter(
    Boolean
  ).length;

  const exertionLimitMet = amountExertable
    ? amountExerted >= amountExertable
    : false;

  let resource = option == "nemo" ? nemo : option == "crew" ? crew : hull;
  let exerting =
    option == "nemo"
      ? exertingNemo
      : option == "crew"
      ? exertingCrew
      : exertingHull;
  let setExerting =
    option == "nemo"
      ? setExertingNemo
      : option == "crew"
      ? setExertingCrew
      : setExertingHull;

  const thisResourceIsExerted = (resourceName: string) => {
    switch (resourceName) {
      case "nemo":
        return exertingNemo;
      case "crew":
        return exertingCrew;
      case "hull":
        return exertingHull;
      default:
        false;
    }
  };

  return (
    <>
      <div className={`resource-wrapper`}>
        <div
          className={`resource-circle-wrapper ${
            doneRolling ? "no-hover" : ""
          } ${
            exertionLimitMet
              ? !thisResourceIsExerted(resource.name)
                ? `disabled hidden`
                : ``
              : ``
          }`}
          onClick={() => {
            if (!doneRolling)
              if (!exertionLimitMet) {
                setExerting(!exerting);
              } else if (thisResourceIsExerted(option as string))
                setExerting(!exerting);
          }}
          data-exerting={exerting ? "exerting" : ""}
        >
          <div className={`resource-circle`}></div>
        </div>
        <div className="resource-info">
          <div
            className={`resource-info-name ${
              doneRolling && !thisResourceIsExerted(resource.name)
                ? "no-hover disabled"
                : ""
            }  ${
              exertionLimitMet
                ? !thisResourceIsExerted(resource.name)
                  ? `disabled shrink`
                  : `shrink`
                : thisResourceIsExerted(resource.name)
                ? `shrink`
                : ``
            }`}
            data-resource={resource.name}
          >
            <p>{resource.name.toUpperCase()}</p>
          </div>
          <div
            className={`resource-info-drm ${
              doneRolling && !thisResourceIsExerted(resource.name)
                ? "no-hover disabled"
                : ""
            } ${
              exertionLimitMet
                ? !thisResourceIsExerted(resource.name)
                  ? `disabled shrink`
                  : ``
                : ``
            }`}
            data-resource={resource.name}
          >
            <p>+{resource.exertionDRM[resource.value]}</p>
          </div>
        </div>
      </div>
    </>
  );
}
