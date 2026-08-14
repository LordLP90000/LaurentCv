import { describe, expect, it } from 'vitest';
import { sections } from './navigation';
import { faq } from './faq';
import { profile } from './profile';
import { experience } from './experience';
import { education } from './education';
import { skillLegend, skillCategories, languages } from './skills';
import { interestAreas, hobbies } from './interests';

function ids<T extends { id: string }>(arr: T[]) {
	return arr.map((x) => x.id);
}

describe('locale data parity (de/en must never silently diverge)', () => {
	it('sections: same length, ids, nums, order', () => {
		expect(sections.en.length).toBe(sections.de.length);
		expect(ids(sections.en)).toEqual(ids(sections.de));
		expect(sections.en.map((s) => s.num)).toEqual(sections.de.map((s) => s.num));
	});

	it('faq: same length', () => {
		expect(faq.en.length).toBe(faq.de.length);
	});

	it('profile: same social length and icon order', () => {
		expect(profile.en.social.length).toBe(profile.de.social.length);
		expect(profile.en.social.map((s) => s.icon)).toEqual(profile.de.social.map((s) => s.icon));
	});

	it('experience: same length, ids, order', () => {
		expect(experience.en.length).toBe(experience.de.length);
		expect(ids(experience.en)).toEqual(ids(experience.de));
	});

	it('education: same length, ids, types, order', () => {
		expect(education.en.length).toBe(education.de.length);
		expect(ids(education.en)).toEqual(ids(education.de));
		expect(education.en.map((e) => e.type)).toEqual(education.de.map((e) => e.type));
	});

	it('skillLegend: same numeric keys per locale', () => {
		expect(Object.keys(skillLegend.en).sort()).toEqual(Object.keys(skillLegend.de).sort());
	});

	it('skillCategories: same ids/order, per-category skill count and levels', () => {
		expect(ids(skillCategories.en)).toEqual(ids(skillCategories.de));
		skillCategories.de.forEach((deCat, i) => {
			const enCat = skillCategories.en[i];
			expect(enCat.skills.length).toBe(deCat.skills.length);
			expect(enCat.skills.map((s) => s.level)).toEqual(deCat.skills.map((s) => s.level));
		});
	});

	it('languages: same length', () => {
		expect(languages.en.length).toBe(languages.de.length);
	});

	it('interestAreas: same length and priorities', () => {
		expect(interestAreas.en.length).toBe(interestAreas.de.length);
		expect(interestAreas.en.map((a) => a.priority)).toEqual(
			interestAreas.de.map((a) => a.priority)
		);
	});

	it('hobbies: same length', () => {
		expect(hobbies.en.length).toBe(hobbies.de.length);
	});
});
