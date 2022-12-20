"use client";
import React, { useState } from "react";
import xCircle from "../../../public/x-circle.svg";
import Image from "next/image";
//This must be in lib folder
type Faculty = {
  id: number;
  name: string;
};

const allFaculties: Faculty[] = [
  { id: 12, name: "Гуманитарный институт" },
  { id: 8, name: "Институт психологии и педагогики" },
  {
    id: 11,
    name: "Институт информационных технологий,точных и естественных наук",
  },
  { id: 3, name: "Факультет физической культуры" },
  { id: 15, name: "Университетский колледж" },
];

enum FacultiesIds {
  GYM = 12,
  PSYCHO = 8,
  ITIEN = 11,
  PE = 3,
  COLLEGE = 15,
}

const Advertising = () => {
  const [faculties, setFaculties] = useState<Faculty[]>();
  return (
    <div className=" max-w-xs flex flex-col flex-grow border rounded-[7px] md:max-w-2xl lg:max-w-6xl p-8">
      <h1 className="text-2xl bold text-white underline">Добавить рекламу</h1>
      <form>
        <div>
          <h2 className="text-xl">Факультеты</h2>
          <ul className="flex list-none overflow-x-auto overflow-y-hidden">
            {allFaculties?.map((faculty: Faculty) => (
              <li
                key={faculty.id}
                className="rounded-2xl bg-red-700 m-3 px-3 py-2 flex items-center"
              >
                <div className="flex items-center justify-start whitespace-nowrap">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6 z-10 hover:cursor-pointer"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  {faculty.id} {faculty.name.slice(0, 12)}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
};

export default Advertising;
