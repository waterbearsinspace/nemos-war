import ResultTable from "./ResultTable";
import { Test } from "./Test";

interface TableAndTestInterface {
  id: string;
}
export default function TableAndTest({ id }: TableAndTestInterface) {
  return (
    <div className="table-and-test">
      <ResultTable id={id} />
      <Test id={id} />
    </div>
  );
}
