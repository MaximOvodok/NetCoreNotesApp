const severityClasses: { [key: string]: string } = {
  Low: "green",
  Normal: "yellow",
  High: "red",
};

const severityDefaultValue: { key: string; value: string } = {
  key: "2",
  value: "Normal",
};

export { severityDefaultValue, severityClasses };
