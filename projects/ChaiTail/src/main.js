import { initChai, applyClasses } from "chaitail";

initChai();

const pgInput = document.getElementById("pg-input");
const pgPreview = document.getElementById("pg-preview");

pgInput.addEventListener("input", (e) => {
  const currentClasses = e.target.value;
  pgPreview.className = currentClasses + " chai-transition-all chai-max-w-full";

  applyClasses(pgPreview);
});
