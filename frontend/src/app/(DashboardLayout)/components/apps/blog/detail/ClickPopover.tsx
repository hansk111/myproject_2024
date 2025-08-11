"use client";

import React from "react";
import { Popover, Typography, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import SvgIcon from "@mui/material/SvgIcon";

import { AnyIfEmpty } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useDeletepostMutation, useUpdatepostMutation } from "@/store/apps/blog/BlogApiSlice";

type FontAwesomeSvgIconProps = {
  icon: any;
};

const FontAwesomeSvgIcon = React.forwardRef<
  SVGSVGElement,
  FontAwesomeSvgIconProps
>((props, ref) => {
  const { icon } = props;

  const {
    icon: [width, height, , , svgPathData],
  } = icon;

  return (
    <SvgIcon ref={ref} viewBox={`0 0 ${width} ${height}`}>
      {typeof svgPathData === "string" ? (
        <path d={svgPathData} />
      ) : (
        /**
         * A multi-path Font Awesome icon seems to imply a duotune icon. The 0th path seems to
         * be the faded element (referred to as the "secondary" path in the Font Awesome docs)
         * of a duotone icon. 40% is the default opacity.
         *
         * @see https://fontawesome.com/how-to-use/on-the-web/styling/duotone-icons#changing-opacity
         */
        svgPathData.map((d: string, i: number) => (
          <path key={d} style={{ opacity: i === 0 ? 0.4 : 1 }} d={d} />
        ))
      )}
    </SvgIcon>
  );
});
FontAwesomeSvgIcon.displayName = "FontAwesomeSvgIcon";

const ClickPopover = (post_id: any) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [deletePost, { isLoading, isError, isSuccess }] = useDeletepostMutation();
  const [editPost] = useUpdatepostMutation();
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const router = useRouter();

  const handleDelete = async (event: any) => {
    event.preventDefault();
    console.log("handleDelete");
    console.log("🚀 ~ handleDelete ~ id:", post_id["post_id"]);
    const postid: any = post_id["post_id"];
    deletePost(postid)
      .unwrap()
      .then(() => {
        router.push("/apps/blog/");
      })
      .then(() => {
        toast.success("Post deleted");
      })
      .catch(() => {
        toast.error("Failed to delete post");
      });
  };

  const handlePostEdit = async (event: any) => {
    event.preventDefault();
    console.log("handlePostEdit");
    console.log("🚀 ~ handlePostEdit ~ id:", post_id["post_id"]);
    const postid: any = post_id["post_id"];
    router.push(`/apps/blog/edit/${postid}`);
    // editPost(postid)
    //   .unwrap()
    //   .then(() => {
    //     router.push(`/apps/blog/${postid}`);
    //   })
    //   .then(() => {
    //     toast.success("Post updated");
    //   })
    //   .catch(() => {
    //     toast.error("Failed to update post");
    //   });
  };

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {/* <Button aria-describedby={id} variant="outlined" size="small" onClick={handleClick}>
        More...
      </Button> */}
      <IconButton onClick={handleClick} aria-label="Example">
        {/* <FontAwesomeIcon icon={faEllipsisV} /> */}
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box p={2}>
          <Stack spacing={2}>
            <Button
              variant="outlined"
              color="info"
              size="small"
              startIcon={<EditIcon />}
              onClick={handlePostEdit}
            >
              Edit
            </Button>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={handleDelete}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </Stack>
        </Box>
      </Popover>
    </>
  );
};
export default ClickPopover;
