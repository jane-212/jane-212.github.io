const updateTheme = (isDarkMode) => {
  const theme = isDarkMode ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", theme);
  update_highlight(isDarkMode);
};

const update_highlight = (isDarkMode) => {
  let cssId = "highlight_css";
  const css = document.getElementById(cssId);
  if (css) css.remove();

  const theme_css = isDarkMode
    ? "/syntax-theme-dark.css"
    : "/syntax-theme-light.css";
  let head = document.getElementsByTagName("head")[0];
  let link = document.createElement("link");
  link.id = cssId;
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = theme_css;
  head.appendChild(link);
};

const toggleTheme = () => {
  initializeTheme();

  document.body.classList.add("theme-transition");
  setTimeout(() => {
    document.body.classList.remove("theme-transition");
  }, 300);
};

const initializeTheme = () => {
  const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  updateTheme(isDarkMode);
};

initializeTheme();

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", toggleTheme);
