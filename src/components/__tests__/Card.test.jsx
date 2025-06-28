/* eslint-env jest */
import { render, screen } from "@testing-library/react";
import Card from "../Card";
import { GoodScoreIcon, NormalScoreIcon, BadScoreIcon } from '../Icon';
import {
    generateRatingIcon,
    generateGenre,
} from '../utils';

const mockAnimeFavourited = {
    mal_id: 1,
    title: "86 saikou!",
    images: { jpg: { image_url: "https://somerandomurl.com/hehe/86" } },
    score: 1000000,
    genres: [
        { mal_id: 1, name: "Action" },
        { mal_id: 2, name: "Adventure" },
        { mal_id: 3, name: "Comedy" },
        { mal_id: 4, name: "Drama" },
    ],
};

const mockAnime = {
    mal_id: 2,
    title: "Test Anime",
    images: { jpg: { image_url: "https://somerandomurl.com/hehe/86" } },
    score: 0,
    genres: [],
};

jest.mock("../../store/store", () => ({
    BaseStore: jest.fn((fn) => {
        if (fn.toString().includes("favourited")) {
            return new Map([["1", { mal_id: "1", title: "Test Anime" }]]);
        }
        if (fn.toString().includes("setFavourited")) {
            return jest.fn();
        }
        return undefined;
    }),
}));

describe("Card component", () => {
    it("renders anime title and genres", () => {
        render(<Card anime={mockAnimeFavourited} />);
        expect(screen.getByText("86 saikou!")).toBeInTheDocument();
        expect(screen.getByText("Action")).toBeInTheDocument();
        expect(screen.getByText("Adventure")).toBeInTheDocument();
        expect(screen.getByText("Comedy")).toBeInTheDocument();
    });

    it("shows filled heart icon if favourited", () => {
        render(<Card anime={mockAnime} />);
        const heartIcon = screen.getByTestId("heart-icon");
        expect(heartIcon).toHaveClass("text-gray-400");
    });

    it("shows filled heart icon if favourited", () => {
        render(<Card anime={mockAnimeFavourited} />);
        const heartIcon = screen.getByTestId("heart-icon");
        expect(heartIcon).toHaveClass("text-red-500");
    });
});

describe('generateRatingIcon utility', () => {
    it('returns GoodScoreIcon for score >= 7', () => {
        expect(generateRatingIcon(8).type).toBe(GoodScoreIcon);
        expect(generateRatingIcon(10).type).toBe(GoodScoreIcon);
    });
    it('returns NormalScoreIcon for 5 <= score < 7', () => {
        expect(generateRatingIcon(5).type).toBe(NormalScoreIcon);
        expect(generateRatingIcon(6).type).toBe(NormalScoreIcon);
    });
    it('returns BadScoreIcon for score < 5', () => {
        expect(generateRatingIcon(4).type).toBe(BadScoreIcon);
        expect(generateRatingIcon(0).type).toBe(BadScoreIcon);
    });
});

describe('generateGenre utility', () => {
    it('returns first three genres as spans', () => {
        const genres = generateGenre(mockAnime.genres);
        expect(genres.length).toBeLessThanOrEqual(3);
    });
    it('returns first three genres as spans', () => {
        const genres = generateGenre([]);
        expect(genres.length).toBeLessThanOrEqual(3);
    });
});
