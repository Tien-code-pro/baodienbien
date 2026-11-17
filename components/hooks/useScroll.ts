export const offScroll = () => {
  const id = document.getElementById("body-tag");
  id?.classList.add("overflow-hidden");
};
export const onScroll = () => {
  const id = document.getElementById("body-tag");
  id?.classList.remove("overflow-hidden");
};
