export function AuthLayout(props) {
  console.log("PROPS IN AUTH LAYOUT:::");
  console.log(props);
  const View = props.view;

  return (
    <div className="flex justify-center items-center bg-gray-300 min-h-screen">
      <View />
    </div>
  );
}
