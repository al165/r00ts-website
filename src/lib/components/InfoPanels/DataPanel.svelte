<script lang="ts">
  import type { Datacenter, Note } from "$lib/types";
  import { markerState } from "../Map/marker.svelte";
  //import AddNotePanel from "./AddNotePanel.svelte";
  import NoteList from "./NoteList.svelte";

  // let cache: {
  //   [key: number]: {
  //     notes?: Note[];
  //     datacenter?: Datacenter;
  //   };
  // } = {};

  let notes: Note[] = $state([]);
  //let datacenter: Datacenter | undefined = $state();

  //let loading = $state({ notes: false, datacenter: false });

  // $effect(() => {
  //
  //   if (activeId == null) return;
  //
  //   if (cache[activeId]?.notes == undefined) {
  //     notes = [];
  //
  //     // loading.notes = true;
  //
  //     // fetch(`/api/note?datacenter_id=${activeId}`)
  //     //     .then((res) => res.json())
  //     //     .then((data) => {
  //     //         notes = data.notes;
  //     //         if (cache[activeId]) cache[activeId].notes = data.notes;
  //     //         else cache[activeId] = { notes: data.notes };
  //     //     })
  //     //     .catch((err) => {
  //     //         console.error(err);
  //     //     })
  //     //     .finally(() => {
  //     //         loading.notes = false;
  //     //     });
  //   } else {
  //     notes = cache[activeId].notes;
  //   }
  //
  //   if (cache[activeId]?.datacenter == undefined) {
  //     datacenter = undefined;
  //
  //     loading.datacenter = true;
  //   }
  // });

  // function newNoteAdded(note: Note) {
  //   notes.push(note);
  // }
</script>

<div class="wrapper" class:hidden={markerState.datacenter == null}>
  {#if markerState.datacenter != null}
    <div class="panel">
      {#if markerState.datacenter.links?.length}
        <h1>
          <a
            href={markerState.datacenter.links[0]}
            rel="noopener"
            target="_blank"
          >
            {markerState.datacenter.name}
          </a>
        </h1>
      {:else}
        <h1>{markerState.datacenter.name}</h1>
      {/if}
      <p>Lat: {markerState.datacenter.lat}</p>
      <p>Lon: {markerState.datacenter.lon}</p>
      <p>City: {markerState.datacenter.city}</p>
      <p>Exact: {markerState.datacenter.precise}</p>
      <NoteList {notes} />
    </div>
  {/if}
</div>

<style>
  a {
    color: blue;
  }

  a:visited {
    color: blue;
  }

  .wrapper {
    transition: width 1s cubic-bezier(0.25, 0.1, 0.25, 1);
    position: absolute;
    right: 3em;
    top: 2em;
    bottom: 2em;
    overflow: hidden;
    z-index: 11;
    width: 350px;
  }

  .panel {
    background-color: white;
    padding: 1.5em;
    height: 100%;
    width: calc(350px - 2 * 1.5em);
    overflow-y: scroll;
  }

  .hidden {
    width: 0px;
  }
</style>
