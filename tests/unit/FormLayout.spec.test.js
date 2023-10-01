import { mount } from "@vue/test-utils";
import FormLayout from "@/components/FormLayout.vue";

describe("FormLayout.vue", () => {
	it("renders data", () => {
		const name = "Przykładowe imie";
		const wrapper = mount(FormLayout, {
			data: {
				userData: {
					firstName: name,
				},
			},
		});
		expect(wrapper.text()).toMatch(name);
	});
});
