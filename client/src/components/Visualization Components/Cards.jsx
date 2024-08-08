import React from "react";

const Cards = (props) => {
  return (
    <section className="border-2 p-2 text-center mb-5">
      <div className="rounded h-100">
        <h5 className="text-2xl font-bold">{props.title}</h5>

        <p className="">{props.content}</p>
      </div>
    </section>
  );
};

export default Cards;
