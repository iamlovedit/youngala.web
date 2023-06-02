interface OrderOption {
    value: string,
    label: string
}

enum FilterType {
    Category = 0,
    Keyword = 1
}

class FilterTag {
    constructor(value: string, Type: FilterType, color: string | undefined) {
        this.value = value
        this.Type = Type
        this.color = color
    }
    value: string
    Type: FilterType
    color: string | undefined
}

export type {
    OrderOption
}

export {
    FilterTag,
    FilterType
}