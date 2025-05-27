interface inputMessagesTypes {
  boolean: boolean;
  message: string;
}
export default function InputMessageComp({
  message,
  boolean,
}: inputMessagesTypes) {
  return (
    <p
      className={`font-bold ${boolean ? "text-green-600" : "text-red-700"} `}
    >
      {message}
    </p>
  );
}
