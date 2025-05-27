
export default function RegistrationLeftside(props: {
  isLogging: boolean;
  setIsLogging: Function;
})

 {

  return (
    <div className="flex flex-col gap-5 items-center relative  bg-creditCard ">
      <h2 className="text-2xl">Offers Card</h2>
      <div className="w-[45px] h-[2px] bg-yellowButton shadow-yellowShadow"></div>
      <p className="text-lg">მოგესალმებით</p>
      <p></p>
      {props.isLogging
        ? "არ გაქვთ ანგარიში? გაიარეთ რეგისტრაცია"
        : "თუ უკვე გაქვთ ანგარიში დააჭირეთ შესვლას"}

      <button
        className="w-[480px] xl:w-full py-5 bg-yellowButton rounded-md shadow-yellowShadow hover:bg-yellowButtonHover transition-all"
        onClick={() => props.setIsLogging(!props.isLogging)}
      >
        {props.isLogging ? "რეგისტრაცია" : "შესვლა"}
      </button>
    </div>
  );
}
