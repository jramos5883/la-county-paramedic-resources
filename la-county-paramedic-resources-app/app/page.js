import Accordion from "./components/accordion";

export default function Home() {
  return (
    <div className="">
      <div className="flex justify-center">
        <h1 className="text-4xl">
          LA County Paramedic Accreditation Objectives Study Guide
        </h1>
      </div>
      <div className="mx-20">
        <Accordion />
      </div>
    </div>
  );
}
