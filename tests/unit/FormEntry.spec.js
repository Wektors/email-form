import { mount } from '@vue/test-utils'
import FormEntry from "@/components/FormEntry.vue";

describe("FormEntry.vue", () => {
	it("renders props.label when passed", () => {
		const label = "Przykładowe imie";
		const wrapper = mount(FormEntry, {
			props: { label },
		});
		expect(wrapper.text()).toMatch(label);
	});
  
});
