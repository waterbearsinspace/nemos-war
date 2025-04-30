import ResultTable from "./ResultTable";
import { Test } from "./Test";

interface TableAndTestInterface {
  id: string;
  testValue?: number;
  exertables?: string[];
}
export default function TableAndTest({
  id,
  testValue,
  exertables,
}: TableAndTestInterface) {
  return (
    <div className="table-and-test">
      <ResultTable id={id} testValue={testValue} />
      <Test id={id} exertables={exertables} />
    </div>
  );
}
