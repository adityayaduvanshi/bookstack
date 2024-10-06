export function applyHeader(chapterJsonContent: any, newHeaderJson: any): any {
  // Ensure chapterJsonContent exists and has the expected structure
  if (
    !chapterJsonContent ||
    !chapterJsonContent.body ||
    !Array.isArray(chapterJsonContent.body.rows)
  ) {
    console.error('Invalid chapter JSON content:', chapterJsonContent);
    return chapterJsonContent; // Return unchanged content
  }

  const updatedChapterContent = { ...chapterJsonContent };

  // Remove existing header rows but preserve footer rows
  updatedChapterContent.body.rows = updatedChapterContent.body.rows.filter(
    (row: any) => !row.isHeader
  );

  // Add new header rows
  if (newHeaderJson?.body?.rows) {
    const headerRows = newHeaderJson.body.rows.map((row: any) => ({
      ...row,
      isHeader: true,
    }));
    updatedChapterContent.body.rows.unshift(...headerRows);
  }

  return updatedChapterContent;
}

export function applyFooter(chapterJsonContent: any, newFooterJson: any): any {
  // Ensure chapterJsonContent exists and has the expected structure
  if (
    !chapterJsonContent ||
    !chapterJsonContent.body ||
    !Array.isArray(chapterJsonContent.body.rows)
  ) {
    console.error('Invalid chapter JSON content:', chapterJsonContent);
    return chapterJsonContent; // Return unchanged content
  }

  const updatedChapterContent = { ...chapterJsonContent };

  // Remove existing footer rows but preserve header rows
  updatedChapterContent.body.rows = updatedChapterContent.body.rows.filter(
    (row: any) => !row.isFooter
  );

  // Add new footer rows
  if (newFooterJson?.body?.rows) {
    const footerRows = newFooterJson.body.rows.map((row: any) => ({
      ...row,
      isFooter: true,
    }));
    updatedChapterContent.body.rows.push(...footerRows);
  }

  return updatedChapterContent;
}
