import { formatDistanceToNow } from "date-fns";

export default function timeAgoFunc(createdAt: string) {
  if (createdAt)
    return formatDistanceToNow(new Date(createdAt), { addSuffix: true });
}
