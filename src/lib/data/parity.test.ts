import { describe, expect, it } from 'vitest';
import { sections } from './navigation';
import { faq } from './faq';
import { profile } from './profile';
import { experience } from './experience';
import { education } from './education';
import { skillLegend, skillCategories, languages } from './skills';
import { interestAreas, hobbies } from './interests';
import { projects } from './projects';
import { experiments } from './lab';
import { notes } from './notes';

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

	it('projects: same ids/order, status/year by index, stack arrays, link hrefs by index', () => {
		expect(ids(projects.en)).toEqual(ids(projects.de));
		expect(projects.en.map((p) => p.status)).toEqual(projects.de.map((p) => p.status));
		expect(projects.en.map((p) => p.year)).toEqual(projects.de.map((p) => p.year));
		projects.de.forEach((deProject, i) => {
			const enProject = projects.en[i];
			expect(enProject.stack).toEqual(deProject.stack);
			expect(enProject.links.map((l) => l.href)).toEqual(deProject.links.map((l) => l.href));
		});
	});

	it('experiments: same length and state values in same order', () => {
		expect(experiments.en.length).toBe(experiments.de.length);
		expect(experiments.en.map((x) => x.state)).toEqual(experiments.de.map((x) => x.state));
	});

	it('notes: same slugs in same order, same dates', () => {
		expect(notes.en.map((n) => n.slug)).toEqual(notes.de.map((n) => n.slug));
		expect(notes.en.map((n) => n.date)).toEqual(notes.de.map((n) => n.date));
	});
});
