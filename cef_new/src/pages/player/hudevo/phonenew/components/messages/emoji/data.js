import EmojiCategory from "#/store/player/hudevo/phonenew/components/messages/emoji/emojiCategory.json";
import EmojiList from "#/store/player/hudevo/phonenew/components/messages/emoji/emojiList.json";

export const getEmojiCategory = () => EmojiCategory;
export const getEmojiList = () => EmojiList;
export const getListData = (name) => EmojiList [name];