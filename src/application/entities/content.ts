export class Content {
  private readonly content: string;

  private validateContentLength(content: string): boolean {
    return content.length >= 5 && content.length <= 250;
  }

  constructor(content: string) {
    const isContentLengthValid = this.validateContentLength(content);

    if (!isContentLengthValid) {
      throw new Error('content length invelid!');
    }

    this.content = content;
  }

  public get value(): string {
    return this.content;
  }
}
