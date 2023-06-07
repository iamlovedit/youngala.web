interface FamilyCategory {
    id: number;
    code: string;
    name: string;
    children: FamilyCategory[];
    parent: FamilyCategory;
}

interface Family {
    id: string;
    name: string;
    createTime: string;
    category: FamilyCategory,
    stars: number;
    imageUrl: string
}

export type {
    FamilyCategory,
    Family
}