import IPost from '../../../contracts/IPost';
import PostModel from '../../../database/models/postModel';

export default class PostValidation {
    validation(data: Pick<IPost, 'title' | 'description'>): void {
        this.titleValidation(data.title);
        this.descriptionValidation(data.description);
    }

    private titleValidation(title: string): void {
        if (!title) throw new Error('title cannot be null');
    }

    private descriptionValidation(description: string): void {
        if (!description) throw new Error('desc cannot be null');
    }
}
