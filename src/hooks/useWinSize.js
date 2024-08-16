import React, { useState, useEffect, useCallback } from "react";

// 自定义hooks，要以use开头
function useWinSize() {
  const [size, setSize] = useState({
    height: window.document.documentElement.clientHeight,
    width: window.document.documentElement.clientWidth,
  });

  /* useCallback 的作用在于利用 memoize 减少无效的 re-render，来达到性能优化的作用。但是，“不要过早的性能优化”。从实际开发的经验来看，在做这类性能优化时，一定得观察比较优化的结果，因为某个小角落的 callback 就可能导致优化前功尽弃，甚至是适得其反。
这里可以直接去掉
*/

  const handleResize = useCallback(() => {
    console.log(window.document);
    setSize({
      height: window.document.documentElement.clientHeight,
      width: window.document.documentElement.clientWidth,
    });
  }, []);

  useEffect(() => {
    // 监听
    window.addEventListener("resize", handleResize);
    console.log("监听");
    // 销毁
    return () => {
      window.removeEventListener("resize", handleResize);
      console.log("销毁");
    };
  }, []);

  return size;
}

//导出这个钩子
export default useWinSize;
