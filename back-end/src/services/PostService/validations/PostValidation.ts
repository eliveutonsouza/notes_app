import IPost from '../../../contracts/IPost';

export default class PostValidation {
    validation(data: Pick<IPost, 'title' | 'description' | 'colorHex'>): void {
        this.titleValidation(data.title);
        this.descriptionValidation(data.description);
        this.colorHexValidation(data.colorHex);
    }

    private titleValidation(title: string): void {
        if (!title) throw new Error('title cannot be null');
    }

    private descriptionValidation(description: string): void {
        if (!description) throw new Error('desc cannot be null');
    }

    private colorHexValidation(colorHex: string): void {
        if (!colorHex) throw new Error('ColorHex cannot be null');

        const rgxHexColor = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

        if (!rgxHexColor.test(colorHex)) {
            throw new Error('color invalid');
        }
    }
}
