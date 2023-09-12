export function Card(props) {
  return (
    <section className="p-6 bg-white border border-gray-200 rounded-lg shadow flex flex-col gap-5">
      {props.title && <h1 className="text-3xl">{props.title}</h1>}

      {props.children}
    </section>
  );
}
