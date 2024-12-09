import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

type Props = {
  imgUrl?: string;
};

const UserImage = ({ imgUrl }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={imgUrl} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
};

export default UserImage;
