<script>
  const src = "/assets/tabler-sprite.svg";
  export let iconName;
</script>

<svg class="{$$props.class}">
  <use xlink:href="{`${src}#tabler-${iconName}`}"></use>
</svg>
