import { useRef, useState } from "react";

import Input from "../../UI/Input";

import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [inputIsValid, setInputIsValid] = useState(true);

  const inputRef = useRef();

  const onSubmitHandler = (event) => {
    event.preventDefault();

    const enteredAmount = inputRef.current.value;
    const numberEnteredAmount = +enteredAmount;

    if (
      enteredAmount.trim().length === 0 ||
      numberEnteredAmount < 1 ||
      numberEnteredAmount > 5
    ) {
      setInputIsValid(false);

      return;
    }

    props.onSubmitAmount(numberEnteredAmount);
  };

  return (
    <form className={classes.form} onSubmit={onSubmitHandler}>
      <Input
        ref={inputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!inputIsValid && <p>Please enter a valid amount (1-5).</p>}
    </form>
  );
};

export default MealItemForm;
