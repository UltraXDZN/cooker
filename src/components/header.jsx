export default function Header({ title }) {
  return (
    <div className=" bg-blue-600 grid place-content-center">
      <h1 className=" text-white text-3xl py-16 font-bold">{title}</h1>
    </div>
  );
}
