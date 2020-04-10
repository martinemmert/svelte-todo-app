<script context="module">
  import i18n from "~i18n";
  import classnames from "classnames";

  const cnFlex = "flex flex-col items-center justify-center";
  const cnDimensions = "w-8 h-8";
  const cnTransition = "transition-colors duration-150 ease-in-out";
  const cnBorder = "border rounded-md";
  const cnMousePointer = "cursor-pointer select-none";

  const cnIdle = classnames(cnFlex, cnDimensions, cnTransition, cnBorder, cnMousePointer);

  const cnDefault = classnames(
    cnIdle,
    "text-gray-700 hover:text-blue-600",
    "hover:border-blue-600",
    "hover:bg-blue-100",
  );

  const cnSelected = classnames(
    cnIdle,
    "text-white",
    "border-blue-600 hover:border-blue-500",
    "bg-blue-600 hover:bg-blue-500",
  );

  const cnToday = classnames(
    cnIdle,
    "text-teal-500 hover:text-blue-600",
    "border-teal-400 hover:border-blue-600",
    "hover:bg-blue-100",
  );

  const cnFaded = classnames(
    cnIdle,
    "text-gray-500 hover:text-blue-600",
    "hover:border-blue-600",
    "hover:bg-blue-100",
    "bg-gray-100",
    "border-gray-100",
  );

  const cnFadedAndToday = classnames(
    cnIdle,
    "text-teal-400 hover:text-blue-600",
    "border-teal-100 hover:border-blue-600",
    "hover:bg-blue-100",
    "bg-teal-100",
  );

  const cnFadedAndSelected = classnames(
    cnIdle,
    "text-blue-400 hover:text-white",
    "border-blue-100 hover:border-blue-500",
    "hover:bg-blue-500",
    "bg-blue-100",
  );

  const cnDisabled = classnames(
    cnIdle,
    "text-gray-400",
    "cursor-not-allowed",
    "border-transparent",
  );
</script>

<script>
  export let value;
  export let today = false;
  export let selected = false;
  export let disabled = false;
  export let currentMonth = true;
  export let title;
  let className;
  export { className as class };

  function getClassNames({ today, selected, disabled, currentMonth }) {
    if (disabled) {
      return cnDisabled;
    } else if (selected) {
      return currentMonth ? cnSelected : cnFadedAndSelected;
    } else if (today) {
      return currentMonth ? cnToday : cnFadedAndToday;
    } else if (!currentMonth) {
      return cnFaded;
    } else {
      return cnDefault;
    }
  }

  $: cn = classnames(getClassNames({ today, selected, disabled, currentMonth }), className);
</script>

<label class="{cn}" {title}>
  <slot />
  <time>{value}</time>
</label>
