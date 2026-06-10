<script setup lang="ts">
	// Import(s)
	import { onMounted, type Ref, ref } from "vue";
	import { RouterView } from "vue-router";
	import Header from "./components/header-component.vue";
	import * as apiCall from "./utils/apiCall.ts";
	import type { UserData } from "./utils/apiCall";

	// Set variable(s)
	const userData: Ref<UserData | undefined> = ref(undefined);

	// Load user if session
	onMounted(async () => {
		userData.value = await apiCall.getSession();
	});
</script>

<template>
	<Header v-bind:userData="userData" />
	<RouterView v-bind:userData="userData" />
</template>

<style>
	/* Global CSS Reset from https://www.joshwcomeau.com/css/custom-css-reset/ */

	/* 1. Use a more-intuitive box-sizing model */
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	/* 2. Remove default margin */
	*:not(dialog) {
		margin: 0;
	}

	/* 3. Enable keyword animations */
	@media (prefers-reduced-motion: no-preference) {
		html {
			interpolate-size: allow-keywords;
		}
	}

	body {
		/* 4. Add accessible line-height */
		line-height: 1.5;
		/* 5. Improve text rendering */
		-webkit-font-smoothing: antialiased;
	}

	/* 6. Improve media defaults */
	img,
	picture,
	video,
	canvas,
	svg {
		display: block;
		max-width: 100%;
	}

	/* 7. Inherit fonts for form controls */
	input,
	button,
	textarea,
	select {
		font: inherit;
	}

	/* 8. Avoid text overflows */
	p,
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		overflow-wrap: break-word;
	}

	/* 9. Improve line wrapping */
	p {
		text-wrap: pretty;
	}
	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		text-wrap: balance;
	}

	/*
 	10. Create a root stacking context
 */
	#root,
	#__next {
		isolation: isolate;
	}
</style>

<style>
	/* Global CSS by me (AntoineLaLune) */

	:root {
		--dark-gray: #2c2c2c;
		--dark-gray-dim: #3c3c3c;
		--light-gray: #e4e4e4;
	}

	html {
		/* Not to harsh white background */
		background-color: var(--light-gray);
	}

	body,
	html {
		margin: 0;
		height: 100%;
	}

	.app {
		margin: 0;
		height: 100%;
	}

	* {
		/* Default font */
		font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

		/* Border color */
		border-color: black;
		border-style: solid;
		border-width: 0px;
	}

	button {
		color: white;
		padding: 8px;
		background-color: var(--dark-gray);
		width: 100%;
		border-width: 2px;
		cursor: pointer;
	}
	button:hover {
		background-color: var(--dark-gray-dim);
	}
	label {
		color: gray;
	}
	input {
		color: white;
		padding: 8px;
		background-color: var(--dark-gray);
		border-width: 2px;
	}
	input:hover {
		background-color: var(--dark-gray-dim);
	}
	input:focus {
		outline-style: dashed;
		outline-color: white;
		border-width: 0px;
		outline-width: 2px;
	}
	input[type="number"] {
		-webkit-appearance: textfield;
		-moz-appearance: textfield;
		appearance: textfield;
	}
	input[type="number"]::-webkit-inner-spin-button,
	input[type="number"]::-webkit-outer-spin-button {
		-webkit-appearance: none;
	}
	input[type="number"] {
		text-align: center;
	}

	textarea {
		display: flex;
		justify-content: start;

		border-width: 2px;

		width: 100% !important;
		background-color: var(--dark-gray);
		color: white;

		outline: 0px;
	}
	textarea:hover {
		background-color: var(--dark-gray-dim);
	}
	textarea:focus {
		outline-style: dashed;
		outline-color: white;
		border-width: 0px;
		outline-width: 2px;
	}

	.cursor {
		cursor: pointer;
	}
	.bold {
		font-weight: bold;
	}
	.not-bold {
		font-weight: normal;
	}

	.warning {
		color: red;
		text-align: center;
		padding: 10px 20px;
	}
	.low-warning {
		color: lightcoral;
		text-align: center;
		padding: 10px 20px;
	}
	.text-center {
		text-align: center;
	}

	img {
		outline-style: dashed;
		outline-color: black;
		outline-width: 2px;
	}

	.admin-element {
		outline-style: dashed;
		outline-width: 4px;
		outline-color: red;
	}
	.admin-div-element {
		border-style: dashed;
		border-width: 4px;
		border-color: red;
	}
	.hide {
		display: none;
	}
	.row {
		display: flex;
		flex-direction: row;
		* {
			margin-inline: 5px;
		}
	}
	.column {
		display: flex;
		flex-direction: column;
		* {
			margin-block: 5px;
		}
	}
	.rm-space {
		* {
			margin-inline: 1px;
			margin-block: 1px;
		}
	}
</style>
