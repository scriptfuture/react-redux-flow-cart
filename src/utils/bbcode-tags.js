import React from 'react'
import { Tag } from 'bbcode-to-react';

// https://github.com/JimLiu/bbcode-to-react

export class YoutubeTag extends Tag {
  toReact() {
    // using this.getContent(true) to get it's inner raw text.
    const attributes = {
      src: this.getContent(true),
      width: this.params.width || 420,
      height: this.params.height || 315,
    };
    return (
      <iframe
        {...attributes}
        frameBorder="0"
        allowFullScreen
      />
    );
  }
}

export class BrTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <br />
    );
  }
}

export class PTag extends Tag {
  toReact() {
    // using this.getComponents() to get children components.
    return (
      <p>{this.getComponents()}</p>
    );
  }
}