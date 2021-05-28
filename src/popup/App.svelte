<script lang="ts">
  let enabled: boolean;
  let text: { [key: string]: string };
  let systems = [];
  let selected: string;
  let newSystem = "";
  $: turned = enabled ? text.turnOff : text.turnOn;
  $: canAdd = newSystem.length === 1 && !systems.includes(newSystem);
  text = {
    buttonRemove: chrome.i18n.getMessage("buttonRemove"),
    placeholderAdd: chrome.i18n.getMessage("placeholderAdd"),
    buttonAdd: chrome.i18n.getMessage("buttonAdd"),
    turnOn: chrome.i18n.getMessage("turnOn"),
    turnOff: chrome.i18n.getMessage("turnOff"),
  };
  const updateIcon = () => {
    if (enabled) {
      chrome.browserAction.setIcon({
        path: {
          "16": "../icons/green_16.png",
          "32": "../icons/green_32.png",
          "128": "../icons/green_128.png",
        },
      });
    } else {
      chrome.browserAction.setIcon({
        path: {
          "16": "../icons/gray_16.png",
          "32": "../icons/gray_32.png",
          "128": "../icons/gray_128.png",
        },
      });
    }
  };
  const getSystems = () => {
    chrome.storage.sync.get(
      ["systems", "currSystem", "enabled"],
      ({ systems: storeSystems, currSystem, enabled: storeEnabled }) => {
        if (typeof storeEnabled === "boolean") {
          enabled = storeEnabled;
          updateIcon();
        } else {
          enabled = true;
          updateIcon();
        }
        if (storeSystems?.length > 0 && currSystem) {
          systems = storeSystems;
          selected = currSystem;
        } else {
          systems = ["x", "h"];
          selected = "x";
          chrome.storage.sync.set({ systems });
          chrome.storage.sync.set({ currSystem: selected });
        }
      }
    );
  };
  const changeSystem = (name: string) => {
    systems = systems;
    selected = name;
    chrome.storage.sync.set({ currSystem: name });
  };
  const removeSystem = (index: number) => {
    systems.splice(index, 1);
    systems = systems;
    //i have to reinitialaze selected system cuz if selected system changes place in array, then it will get unchecked
    const selectedCopy = selected;
    selected = "xD";
    chrome.storage.sync.set({ systems }, () => (selected = selectedCopy));
  };
  const addSystem = () => {
    systems.push(newSystem);
    systems = systems;
    chrome.storage.sync.set({ systems });
    newSystem = "";
  };
  const changeEnabled = () => {
    enabled = !enabled;
    chrome.storage.sync.set({ enabled }, () => updateIcon());
  };
  getSystems();
</script>

<div id="app">
  <h1 id="title">Konvertilo</h1>
  <div class="top-container">
    <h2 class="top-container__title">Systems</h2>
    <ul class="list">
      {#each systems as system, index}
        <li class="element">
          <label>
            <input
              class="element__label"
              type="radio"
              on:change={() => changeSystem(system)}
              bind:group={selected}
              value={system}
            />{system}-sistemo
          </label>
          <button
            class="element__button"
            on:click={() => removeSystem(index)}
            disabled={system === selected}
            class:element__button--off={system === selected}
            >{text.buttonRemove}</button
          >
        </li>
      {/each}
    </ul>
  </div>
  <div class="bottom-container">
    <div>
      <input
        class="newSystem-input"
        type="text"
        bind:value={newSystem}
        maxlength="1"
        placeholder={text.placeholderAdd}
      />
      <button
        on:click={addSystem}
        disabled={!canAdd}
        class="newSystem-button"
        class:newSystem-button--off={!canAdd}>{text.buttonAdd}</button
      >
    </div>
    <button
      on:click={changeEnabled}
      class="switch {enabled ? 'switch--on' : 'switch--off'}">{turned}</button
    >
  </div>
</div>

<style lang="sass" global>
$gray: #EDEDED
$green: #37A93A
$red: #a93737
$input-gray: #CBCBCB

#app
  background: $green

:global(body, html)
  padding: 0
  margin: 0
  display: flex

.bottom-container, .top-container
  display: block
  margin: 5px
  border: 1px solid $gray

#title
  font-family: 'Open Sans', sans-serif
  margin: 5px
  font-size: 1.8rem
  text-align: center
  color: $gray

.top-container
  height: 140px
  overflow-y: auto
  &__title
    font-family: 'Open Sans', sans-serif
    color: $gray
    background: $green
    top: 0
    text-align: center
    position: sticky
    border-bottom: 1px solid $gray
    font-size: 1.4rem
    margin: 0 5px 0 5px
    padding: 5px 0 5px 0

.list
  padding: 0
  list-style-type: none

.element
  color: $gray
  font-size: 1rem
  font-family: 'Open Sans', sans-serif
  margin: 10px
  display: grid
  grid-template-columns: repeat(2, 1fr) 
  column-gap: 10px


button, input
  font-family: 'Open Sans', sans-serif
  font-size: .9rem
  outline: none
  border: 1px solid black
  background: $gray

.switch, .newSystem-input, .newSystem-button
  box-sizing: border-box
  display: block
  width: 240px
  height: 30px
  margin: 5px

.newSystem-button, .element__button
  &--off
    border-color: $input-gray

.switch--off
  background: $red

.switch--on
  background: $green
</style>
