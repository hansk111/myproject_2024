import React from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { IconArrowBackUp, IconCircle } from "@tabler/icons-react";
import { BlogType } from "../../../../types/apps/blog";
import { format } from "date-fns";
import { useDispatch, useSelector } from "@/store/hooks";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { AppState } from "@/store/store";
import {
  addReply,
  fetchBlogPost,
  fetchBlogPostwithoutViewUpdate,
} from "@/store/apps/blog/BlogSlice";

const BlogComment = ({ comment }: BlogType | any) => {
  const dispatch = useDispatch();
  const [showReply, setShowReply] = React.useState(false);
  const [replyTxt, setReplyTxt] = React.useState("");
  const pathName = usePathname();

  const getId: string | any = pathName.split("/").pop();
  console.log("getId=", getId);

  const onSubmit = async (id: number, replyTxt: string) => {
    // const replyId: string = uniqueId("#comm_");
    const newReply = {
      comment: id,
      body: replyTxt,
    };
    dispatch(addReply(id, newReply));
    dispatch(fetchBlogPostwithoutViewUpdate(getId));
    setReplyTxt("");
  };

  return (
    <>
      <Box mt={2} p={3} sx={{ backgroundColor: "grey.100" }}>
        <Stack direction={"row"} gap={2} alignItems="center">
          <Avatar
            alt="Remy Sharp"
            src={`${process.env.NEXT_PUBLIC_HOST}/media/${comment?.author_image}`}
            sx={{ width: "33px", height: "33px" }}
          />
          <Typography variant="h6">{comment?.author}</Typography>
          <Typography variant="caption" color="textSecondary">
            <>
              <IconCircle
                size="7"
                fill=""
                fillOpacity={"0.1"}
                strokeOpacity="0.1"
              />{" "}
              {format(new Date(comment?.createdAt), "E, MMM d")}
            </>
          </Typography>
        </Stack>
        <Box py={2}>
          <Typography color="textSecondary">{comment?.body}</Typography>
          {/* <pre dangerouslySetInnerHTML={{ __html: comment?.body }} /> */}
        </Box>
        <Stack direction="row" gap={1} alignItems="center">
          <Tooltip title="Reply" placement="top">
            <Fab
              size="small"
              color="info"
              onClick={() => setShowReply(!showReply)}
            >
              <IconArrowBackUp size="16" />
            </Fab>
          </Tooltip>
        </Stack>
      </Box>
      {comment?.replies ? (
        <>
          {comment?.replies.map((reply: BlogType | any) => {
            return (
              <Box pl={4} key={reply.comment}>
                <Box mt={2} p={3} sx={{ backgroundColor: "grey.100" }}>
                  <Stack direction={"row"} gap={2} alignItems="center">
                    <Avatar
                      alt="Remy Sharp"
                      src={`${process.env.NEXT_PUBLIC_HOST}/media/${reply.author_image}`}
                    />
                    <Typography variant="h6">{reply.author}</Typography>
                    <Typography variant="caption" color="textSecondary">
                      <IconCircle
                        size="7"
                        fill=""
                        fillOpacity={"0.1"}
                        strokeOpacity="0.1"
                      />{" "}
                      {format(new Date(reply.createdAt), "E, MMM d")}
                    </Typography>
                  </Stack>
                  <Box py={2}>
                    <Typography color="textSecondary">{reply.body}</Typography>
                    {/* <pre dangerouslySetInnerHTML={{ __html: reply.body }} /> */}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </>
      ) : (
        ""
      )}
      {showReply ? (
        <Box p={2}>
          <Stack direction={"row"} gap={2} alignItems="center">
            <Avatar
              alt="Remy Sharp"
              src={`${process.env.NEXT_PUBLIC_HOST}/media/${comment?.author_image}`}
              sx={{ width: "33px", height: "33px" }}
            />
            <TextField
              rows={1}
              placeholder="Reply"
              variant="outlined"
              multiline
              fullWidth
              value={replyTxt}
              onChange={(e) => setReplyTxt(e.target.value)}
            />

            <Button
              variant="contained"
              onClick={() => onSubmit(comment.id, replyTxt)}
            >
              Reply
            </Button>
          </Stack>
        </Box>
      ) : (
        ""
      )}
    </>
  );
};

export default BlogComment;
