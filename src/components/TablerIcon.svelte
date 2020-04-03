<script>
  const src = "/assets/tabler-sprite.svg";
  export let iconName;
</script>

<svg width="24" height="24" class="{$$props.class}">
  <use xlink:href="{`${src}#tabler-${iconName}`}"></use>
</svg>
