import type { Schema, Struct } from '@strapi/strapi';

export interface HomepageHero extends Struct.ComponentSchema {
  collectionName: 'components_homepage_heroes';
  info: {
    description: 'Homepage hero content';
    displayName: 'Hero';
  };
  attributes: {
    countdownEnd: Schema.Attribute.DateTime;
    dateLabel: Schema.Attribute.String & Schema.Attribute.Required;
    eyebrow: Schema.Attribute.String & Schema.Attribute.Required;
    titleLine1: Schema.Attribute.String & Schema.Attribute.Required;
    titleLine2: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface HomepageSectionItem extends Struct.ComponentSchema {
  collectionName: 'components_homepage_section_items';
  info: {
    description: 'Flexible homepage content section item';
    displayName: 'Section Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.String;
    order: Schema.Attribute.Integer & Schema.Attribute.DefaultTo<0>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    variant: Schema.Attribute.Enumeration<
      ['highlight', 'rule', 'about', 'location', 'social']
    > &
      Schema.Attribute.DefaultTo<'highlight'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'homepage.hero': HomepageHero;
      'homepage.section-item': HomepageSectionItem;
    }
  }
}
